import { reactive, h } from 'vue'
import { NIcon } from 'naive-ui'
import { ChevronDownOutline, HomeOutline, FolderOpenOutline, DocumentText } from '@vicons/ionicons5'
import { menuList } from '@/config'

export const subMenu = reactive({visible: false, x: 0, y:0, option: null})
export const subMenuHeight = 4*40 + 100

export function addSubMenu(item, option) {

  let parentItem = null
  let selectItem = null
  let selectItemKey = ''
  let addItem = null

  const node = getSelectItem(option)
  parentItem = node.parentItem
  selectItem = node.selectItem
  selectItemKey = selectItem.key
  addItem = item
  
  if(option.type === 'folder'){
    addItem.seq = JSON.parse(JSON.stringify(option.seq))
    if(selectItem.children) {
      let s = selectItem.children.length
      selectItemKey = `${selectItemKey}-${s+1}`
      addItem.seq.push(s+1)
      addItem.key = selectItemKey
      selectItem.children.push(addItem)
    } else {
      selectItemKey = `${selectItemKey}-1`
      addItem.seq.push(1)
      addItem.key = selectItemKey
      selectItem.children = [addItem]
    }    
  } else if(option.type === 'file'){
    let newChildNode = getNewChildNode('add', addItem, selectItem, parentItem, node)
    parentItem.children = newChildNode
  }
}

export function deleteSubMenu(option) {
  if(option.delete && option.delete === 'false') {
    console.log('deleteSubMenu foler:', 'folder can not delete')
    return      
  }

  const node = getSelectItem(option)
  let parentItem = node.parentItem
  let selectItem = node.selectItem
  let newChildNode = []

  if(option.type === 'folder') {
    if(selectItem.children && selectItem.children.length > 0) {
      console.log('deleteSubMenu foler:', 'folder not empty')
      return
    }
  }

  newChildNode = getNewChildNode('delete', null, selectItem, parentItem, node)
  parentItem.children = newChildNode
}

export function modifySubMenu(newLabel, option) {
  if(option.delete && option.delete === 'false') {
    console.log('modifySubMenu foler:', 'folder can not modify')
    return      
  }

  if(option.type === 'folder') {
    option.label = newLabel
  }
  return
}

// get select menu item and it's parent item
function getSelectItem(option) {
  let level = option.seq.length
  let selectItem = null
  let parentItem = null
  selectItem = menuStore.menuOptions[option.seq[0]-1] //先取得根結點，因為後續的尋找沒有children
  for(let l=1; l<level; l++) {
    if(l===1) {
      parentItem = menuStore.menuOptions[option.seq[l-1]-1]
    } else {
      parentItem = parentItem.children[option.seq[l-1]-1]
    }
    selectItem = selectItem.children[option.seq[l]-1]
  }
  return {selectItem: selectItem, parentItem: parentItem, selectLevel: level}
}

// get new child item list for add, delete, forward, backward
function getNewChildNode(action, addItem, selectItem, parentItem, node) {
  let selectSeq = selectItem.seq[node.selectLevel-1]
  let newChildNode = []
  
  let s = parentItem.children.length

  if(action === 'add') {
    let selectItemKey = `${parentItem.key}-${selectSeq+1}`
    addItem.seq = JSON.parse(JSON.stringify(parentItem.seq))
    addItem.seq.push(selectSeq+1)
    addItem.key = selectItemKey
  }
  
  if(action === 'add') {
    for(let i=0; i<s; i++) {
      if(i+1 > selectSeq) {
        parentItem.children[i].seq[node.selectLevel-1] = parentItem.children[i].seq[node.selectLevel-1] + 1
        parentItem.children[i].key = `${parentItem.key}-${parentItem.children[i].seq[node.selectLevel-1]}`
        childrenNodeUpdateRecursion(parentItem.children[i], node.selectLevel, parentItem.children[i].seq[node.selectLevel-1])
      }
      newChildNode.push(parentItem.children[i])
      if(i+1 === selectSeq) {
        newChildNode.push(addItem)
      }
    }
  } else if(action === 'delete') {
    for(let i=0; i<s; i++) {
      if(i+1 > selectSeq) {
        parentItem.children[i].seq[node.selectLevel-1] = parentItem.children[i].seq[node.selectLevel-1] - 1
        parentItem.children[i].key = `${parentItem.key}-${parentItem.children[i].seq[node.selectLevel-1]}`
        childrenNodeUpdateRecursion(parentItem.children[i], node.selectLevel, parentItem.children[i].seq[node.selectLevel-1])
      }
      if(i+1 !== selectSeq) {
        newChildNode.push(parentItem.children[i])
      }
    }
  }

  return newChildNode
}

function childrenNodeUpdateRecursion(item, level, seq) {
  if(item.children) {
    for(let i=0; i<item.children.length; i++) {
      item.children[i].seq[level-1] = seq
      let key = item.children[i].seq[0]
      for(let j=1; j<item.children[i].seq.length; j++) {
        key = key + `-${item.children[i].seq[j]}`
      }
      item.children[i].key = key
      childrenNodeUpdateRecursion(item.children[i], level, seq)
    }  
    return  
  } else {
    return
  }
}

// add sider menu - step 3/?
export const menuStore = reactive({
  HOME: 'HOME',
  menuOptions: menuList,

  expandIcon () {
    return h(NIcon, null, { default: () => h(ChevronDownOutline) })
  },

  // add sider menu icon(folder_xxx icon is fix render by folder icon) - step 4/?
  renderMenuIcon (option) {
      if(option.type === 'folder') {
        return h(NIcon, null, { default: () => h(FolderOpenOutline, {oncontextmenu:(e) => {e.preventDefault(); handleContextmenu(e, option)} }) })
      } else {
        if(option.key === '1') {
          return h(NIcon, null, { default: () => h(HomeOutline) })
        } else {
          return h(NIcon, null, { default: () => h(DocumentText, {oncontextmenu:(e) => {e.preventDefault(); handleContextmenu(e, option)}}) })
        }
        
      }   
  },

  renderMenuLabel (option) {
    if(option.key === '1') {
      return h('span', {
        innerHTML: option.label      
      })
    } else {
      return h('span', {
        style: { display: 'inline-block', width: '100%'},
        innerHTML: option.label, 
        oncontextmenu:(e) => {e.preventDefault(); handleContextmenu(e, option)}        
      })
    }
  }
})

function handleContextmenu(e, option) {
  subMenu.visible = true
  subMenu.x = e.pageX
  subMenu.y = e.pageY + 10
  subMenu.option = option
  if(e.pageY > window.innerHeight - subMenuHeight)
  {
    subMenu.y = e.pageY - subMenuHeight - 10
  } 
  console.log('handleContextmenu event:', e)
  //console.log('handleContextmenu option:', option)
}