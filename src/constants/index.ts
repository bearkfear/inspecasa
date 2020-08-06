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

const VUE_PROGRESSBAR_CONFIG = {
  color: '3677F6',
  failedColor: 'red',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'left',
  inverse: false,
};

export default {
  BUEFY_OPTIONS,
  CKEDITOR_CONFIG,
  VUE_PROGRESSBAR_CONFIG,
};
