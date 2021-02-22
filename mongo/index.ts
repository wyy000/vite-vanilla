export const menuList = [
  {name: 'chart', path: 'chart.html'},
  {name: 'input', path: 'input.html'},
  {name: 'table', path: 'table.html'},
  {name: 'customerGroup', path: 'customerGroup.html', active: true},
  {name: 'tableSort', path: 'tableSort.html'},
]

export const tableData = Array.from({length: 20}).map((it, idx) => ({
  id: Math.random(),
  age: parseInt(String(Math.random() * 100)),
  count: parseInt(String(Math.random() * 2000)),
  time: Date.now() + idx,
}))
