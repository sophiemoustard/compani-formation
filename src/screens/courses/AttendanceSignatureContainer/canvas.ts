import { IS_WEB } from '../../../core/data/constants';

export const htmlContent = `
<html>
  <head>
    <style>
      .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .signature-pad {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: white;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
  </head>
  <body>
    <div class="wrapper">
      <canvas id="signature-pad" class="signature-pad"></canvas>
    </div>
  </body>
  <script>
    let canvas = document.getElementById('signature-pad');
  
    const resizeCanvas = () => {
      const ratio = 1;
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
    };
    window.onresize = resizeCanvas;
    resizeCanvas();

    let signaturePad = new SignaturePad(canvas, { minWidth: 2, maxWidth: 2 });

    const clearSignature = () => {
      signaturePad.clear();
      if (${IS_WEB}) window.parent.postMessage('', "*");
      else window.ReactNativeWebView.postMessage('');
    };

    const undoSignature = () => {
      const data = signaturePad.toData();
      if (data) {
        data.pop();
        signaturePad.fromData(data);
        if (signaturePad.isEmpty()) {
          signaturePad.clear();
          if (${IS_WEB}) window.parent.postMessage('', "*");
          else window.ReactNativeWebView.postMessage('');
        } else {
          const dataUrl = signaturePad.toDataURL('image/png');
          if (${IS_WEB}) window.parent.postMessage(dataUrl, "*");
          else window.ReactNativeWebView.postMessage(dataUrl);
        }
      }
    };

    const handleMessage = (message) => {
      if (message === 'clear') clearSignature();
      else if (message === 'undo') undoSignature();
    };

    signaturePad.addEventListener('endStroke', () => {
      const dataUrl = signaturePad.toDataURL('image/png');
      if (${IS_WEB}) window.parent.postMessage(dataUrl, "*");
      else window.ReactNativeWebView.postMessage(dataUrl);
    });
    window.addEventListener('message', (event) => handleMessage(event.data));
  </script>
</html>
`;
