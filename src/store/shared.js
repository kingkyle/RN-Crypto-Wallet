export const handleLoading =
  (action => action?.type?.endsWith('/pending'),
  state => {
    state.loading = true;
  });

export const handleSuccess =
  (action => action?.type?.endsWith('/fulfilled'),
  state => {
    state.loading = false;
  });

export const handleError =
  (action => action?.type?.endsWith('/rejected'),
  state => {
    state.loading = false;
  });
