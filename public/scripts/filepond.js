FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
);

FilePond.setOptions({
  stylePanelAspectRatio: 100 / 60,
  imageResizeTargetWidth: 60, 
  imageResizeTargetHeight: 100 
})

FilePond.parse(document.body);