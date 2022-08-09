export default {
  name: 'renderTableColumn',
  inject: ['tableRoot'],
  functional: true,
  props: {
    scope: Object,
    render: Function
  },
  render: (h, ctx) => {
    return ctx.props.render(h, ctx.props.scope);
  }
};
