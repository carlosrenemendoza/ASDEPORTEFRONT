const Forms = [
  {
    type: 'Input',
    label: 'Title Post',
    name: 'Title',
    class: 'col-md-6',
    id: 'title',
    style: {},
    required: true
  },
  {
    type: 'Input',
    label: 'Authors name',
    name: 'name',
    class: 'col-md-6',
    id: 'name',
    style: {},
    required: true
  },
  {
    type: 'textarea',
    label: 'Post blog',
    class: 'col-md-12',
    placeHolder: '',
    name: 'Comment',
    id: 'post',
    style : {},
    required : true,
    show : true
  },
];

export default Forms;
