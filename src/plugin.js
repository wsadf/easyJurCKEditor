class HighlightedQuotePlugin {
    constructor(editor) {
        this.editor = editor;
        this.init();
    }

    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('highlightedQuote', locale => {
            const button = document.createElement('button');
            button.textContent = 'Insert Highlighted Quote';
            button.addEventListener('click', () => {
                const viewFragment = this.createHighlightedQuote();
                editor.model.change(writer => {
                    editor.model.insertContent(viewFragment, editor.model.document.selection);
                });
            });
            return button;
        });

        editor.model.schema.register('highlightedQuote', {
            allowWhere: '$block',
            allowContentOf: '$block'
        });

        editor.conversion.for('downcast').elementToElement({
            model: 'highlightedQuote',
            view: (modelElement, viewWriter) => {
                const container = viewWriter.createContainerElement('blockquote', {
                    class: 'highlighted-quote'
                });

                return toWidget(container, viewWriter, { label: 'Highlighted Quote' });
            }
        });

        editor.conversion.for('upcast').elementToElement({
            view: 'blockquote.highlighted-quote',
            model: 'highlightedQuote'
        });
    }

    createHighlightedQuote() {
        const element = document.createElement('blockquote');
        element.className = 'highlighted-quote';
        return element;
    }
}
