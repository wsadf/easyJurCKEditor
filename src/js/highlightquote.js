import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

export default class HighlightQuote extends Plugin {
    init() {
        const editor = this.editor;

        editor.model.schema.register('highlightQuote', {
            isObject: true,
            allowWhere: '$block',
            allowContentOf: '$block',
        });

        editor.conversion.for('dataDowncast').elementToElement({
            model: 'highlightQuote',
            view: {
                name: 'blockquote',
                classes: 'highlight-quote'
            }
        });

        editor.ui.componentFactory.add('highlightQuote', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Inserir Citação Destacada',
                icon: '<svg ...></svg>',
                tooltip: true
            });

            view.on('execute', () => {
                editor.model.change(writer => {
                    const highlightQuote = writer.createElement('highlightQuote');
                    editor.model.insertContent(highlightQuote);
                });
            });

            return view;
        });
    }
}
