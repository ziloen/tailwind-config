## tailwindcss cheatsheet

### `*:`

```html
<!-- 
.\*\:bg-white > * {
  background-color: white */;
}
-->
<div class="*:bg-white"></div>
```

### `bg-(--color)`

```html
<!-- background-color: var(--color); -->
<div class="bg-(--color)"></div>
```

### linear-gradient

### Abbreviations

`flex-shrink-0` = `shrink-0`
`flex-shrink` = `shrink`
`flex-grow-0` = `grow-0`  
`flex-grow` = `grow`
`[&>*]:bg-red` = `*:bg-red`
`[&_*]:bg-red` = `**:bg-red`
`border-[1px]` = `border`
`bg-[var(--color)]` = `bg-(--color)`