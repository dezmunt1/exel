export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array((end - start) + 1)
      .fill('')
      .map( (_, i) => start + i)
}

export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  return localStorage.setItem(key, JSON.stringify(data))
}

export function delStorage(key) {
  if ( !key ) {
    return localStorage.clear()
  }
  return localStorage.removeItem(key)
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDash(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDash(key)}: ${styles[key]}`)
      .join(';')
}

export function debounce(fn, ms) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      fn(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, ms)
  }
}

export function clone(obj) {
  return JSON.parse( JSON.stringify(obj) )
}

export function preventDefault(event) {
  event.preventDefault()
}
