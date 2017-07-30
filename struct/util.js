Nitro.cleanVarName = (name) => {
  if (!name) return null
  if (name.replace(/\s+/g, "").length < 1) return false
  name = name.replace(/\s/g, "-")
  name = name.toLowerCase()
  return name
}

Nitro.pullProps = (obj, props) => props.reduce((o, p) => { o[p] = obj[p]; return o }, {})