import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

const initialState = {
  photos,
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      state.photos.unshift({ id: state.photos.length + 1, caption: action.payload.caption, imageUrl: action.payload.imageUrl });
    },
    removePhoto: (state, action) => {
      state.photos.splice(
        state.photos.findIndex((photo) => photo.id === action.payload),
        1
      );
    },
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  // Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
  const photos = selectAllPhotos(state);
  const searchTerm = selectSearchTerm(state);

  return photos.filter((photo) => photo.caption.toLowerCase().includes(searchTerm.toLowerCase()));
};
