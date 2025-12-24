async function procesarPDF() {
    const fileInput = document.getElementById('pdfFile');

    if (!fileInput.files.length) {
        alert('Seleccioná un PDF');
        return;
    }

    const texto =
        document.getElementById('watermark').value ||
        'EQUIPO ECONOMICO LUCAS BRONICARDI';

    const file = fileInput.files[0];
    const arrayBuffer = await file.arrayBuffer();

    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    pages.forEach(page => {
        const { width, height } = page.getSize();
        page.drawText(texto, {
            x: width / 4,
            y: height / 2,
            size: 40,
            rotate: PDFLib.degrees(45),
            opacity: 0.15
        });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'pdf_con_marca_agua.pdf';
    link.click();
}
