export const commonMethods = (ctx) => {
  const operateButtonClick = (type, row) => {
    ctx.emit('operateButtonClick', {type, row})
  }
  return {
    operateButtonClick
  }
}
