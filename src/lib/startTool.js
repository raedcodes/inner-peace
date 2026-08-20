export const START_TOOL_EVENT = 'inner-peace:start-tool'

// Maps a resource href (e.g. "#tool-breathing") to the tool key its
// component listens for. Scrolls to the tool and asks it to auto-start,
// collapsing "read advice" and "do the thing" into one action.
export function startTool(href) {
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const tool = href.replace('#tool-', '')
  window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent(START_TOOL_EVENT, { detail: { tool } }))
  }, 400)
}
