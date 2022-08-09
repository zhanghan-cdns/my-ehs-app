export default {
    name: 'slotTableColumn',
    inject: ['tableRoot'],
    functional: true,
    props: {
        scope: Object,
        slotName:String
    },
    render: (h, ctx) => {
      console.log(ctx,'ctx')
        return h('div', ctx.injections.tableRoot.$scopedSlots[ctx.props.slotName](ctx.props.scope));
    }
};
