const BUEFY_OPTIONS = {
  defaultIconPack: 'fas', // font awesome default icon pack
  defaultDialogCancelText: 'Cancelar',
  defaultDayNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  defaultMonthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  defaultClockpickerHoursLabel: 'Hora',
  defaultClockpickerMinutesLabel: 'Minuto',
};

const CKEDITOR_CONFIG = {
	language: 'br',
	removePlugins: [ 'Heading', 'Link' ],
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
  ],
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
    ],
  },
};


export default {
  BUEFY_OPTIONS,
  CKEDITOR_CONFIG,
};
