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
            x: width / 6,
            y: height / 2,
            size: 70,                     // 🔥 más grande
            rotate: PDFLib.degrees(45),   // diagonal
            opacity: 0.18                 // visible pero sutil
        });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = file.name; // ✅ MISMO NOMBRE
    link.click();
}
