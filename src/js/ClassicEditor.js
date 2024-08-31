import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import HighlightQuote from './highlightquote';
import './highlightquote.css'; // Importar o CSS

ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [HighlightQuote],
        toolbar: ['highlightQuote']
    })
    .catch(error => {
        console.error(error);
    });
