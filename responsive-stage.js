(() => {
  const loader = document.currentScript;
  const designWidth = Number(loader?.dataset.width) || 1600;
  const designHeight = Number(loader?.dataset.height) || 900;
  const frame = document.querySelector('.frame');

  if (!frame) return;

  const fitStage = () => {
    const bodyStyle = getComputedStyle(document.body);
    const horizontalPadding =
      (Number.parseFloat(bodyStyle.paddingLeft) || 0) +
      (Number.parseFloat(bodyStyle.paddingRight) || 0);
    const availableWidth = Math.max(
      1,
      document.documentElement.clientWidth - horizontalPadding
    );
    const scale = Math.min(1, availableWidth / designWidth);

    frame.style.width = `${designWidth}px`;
    frame.style.height = `${designHeight}px`;
    frame.style.maxWidth = 'none';
    frame.style.aspectRatio = 'auto';
    frame.style.zoom = String(scale);

    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.alignItems = 'start';
    document.body.style.justifyItems = 'center';
  };

  fitStage();
  requestAnimationFrame(fitStage);
  document.fonts?.ready.then(fitStage);
  window.addEventListener('resize', fitStage, { passive: true });
})();
