export const setFormData = (files: File[], propertyName: string) => {
  const formData = new FormData();
  if (files.length) {
    for (let i = 0; i < files.length; i += 1) {
      const blob = new Blob([files[i]], { type: files[i].type });
      formData.append(propertyName, blob, encodeURIComponent(files[i].name));
    }
  }

  return formData;
};
