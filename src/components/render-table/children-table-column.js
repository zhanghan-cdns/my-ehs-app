// 嵌套表头渲染
export default {
  name: 'childrenTableColumn',
  inject: ['tableRoot'],
  functional: true,
  props: {
    columns: Array
  },
  render: (h, ctx) => {
    return ctx.props.columns.map((column) => {
      let attrs = {
        props: {...column, key: Math.random()}
      }
      if (column.render || column.slotName) {
        attrs.scopedSlots = {
          default: scope => {
            // render函数渲染
            if (column.render) {
              return <renderTableColumn render={column.render} scope={scope} key={Math.random()}>
              </renderTableColumn>
            }
            // slot插槽渲染
            else if (column.slotName) {
              return <slotTableColumn slot-name={column.slotName} scope={scope} key={Math.random()}>
              </slotTableColumn>
            }
          }
        }
      }
      // 继续嵌套
      if (column.children && column.children.length > 0) {
        return <vxe-table-colgroup {...attrs}>
          <childrenTableColumn columns={column.children} key={Math.random()}>
          </childrenTableColumn>
        </vxe-table-colgroup>
      }
      // 直接渲染
      return <vxe-table-column {...attrs}>
      </vxe-table-column>
    })
  }
};
