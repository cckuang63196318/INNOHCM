# About HCM
## Develop - FrontEnd
### myButton01
- 屬性
    - action : 動作名稱, 會有相對應icon。
    ```
    search, open
    add, copy, edit, delete, import, export, preprint
    save, cancel, print
    confirm, close
    ```
    - size : 按鈕大小。
    ```
    tiny, small(default), medium, large
    ```
    - iconOnly : 不要按鈕文字，只顯示按鈕Icon
- 事件
    - click(action) : 按鈕點及觸發事件及呼叫相對應的Function

### mySwitch01
- 屬性
    - action : 動作名稱, 會有相對應icon。
    ```
    lock
    ```
    - size : 按鈕大小。
    ```
    small, medium, large(default)
    ```
    - value : 控制switch的狀態(注意傳入的對象是物件形式)
    ```
    {
        value: true
    }
    ```
- 事件
    - update(value) : Switch按鈕點及觸發事件及呼叫相對應的Function

### myForm01
- 屬性
    - value : key欄位名稱, value欄位值, type欄位型態(select, text,...), options下拉選單select的選項清單。
    ```
        const form = reactive({
        role: { value: null, type: 'select', col: 1,     
            required: true, disabled: false,
            options: [{label: 'Role1', value: 'R1'}, {label: 'Role2', value: 'R2'}]
        },
        ...
        })
    ```
- 事件
    - update(key, value) : form欄位key名稱內容改變value

### myDataTable01
- 屬性
    - value : value欄位值, columns欄位名稱, editMode是否編輯模式(編輯模式最右邊出現編輯按鈕)。
    ```
    const initialTable = reactive({
        value: [
            {
            key: 1,
            name: "Edward King",
            age: 32,
            address: "London, Park Lane no."
            }
            ...
        ],
        columns: [
            {
            title: "Name",
            key: "name",
            fixed: "left",
            sorter: true
            },
            {
            title: "Age",
            key: "age",
            width: 80
            },
            {
            title: "Address",
            key: "address"
            }
        ],
        editMode: { value: false}
    })
    ```
- 事件
    - button-click(action) : 編輯按鈕點及觸發事件及呼叫相對應的Function
    - page-click(page) : DataTable Page按鈕點及觸發事件及呼叫相對應的Function

### toolBar01
- 屬性
    - buttons-value : 設定button清單。
    ```
    const toolBarButtonsInitial = {
        search: {},
        copy: {},
        open: {},
        close: {}
    }
    ```
    - switch-value : 設定switch狀態及切換value時需要呼叫取的lock資料的Function。
    ```
    const toolBarSwitchInitial = reactive({
        value: {value: false},
        setLockObject: setLockObject
    })
    function setLockObject() {
        if(form.role.value?.length > 0) {
            return { mainItem: form.role.value, subItem: '' }
        } else {
            return null
        }
    }
    ```
- 事件
    - button-click(action) : 按鈕點及觸發事件及呼叫相對應的Function
    - switch-update(value) : Switch按鈕點及觸發事件及呼叫相對應的Function
---

## Deploy
```
podman build -f Dockerfile -t frontend:v3.01 . --no-cache
podman tag frontend:v3.01 irepocld.cminl.oa/hcm-prod/frontend:v3.01
podman push irepocld.cminl.oa/hcm-prod/frontend:v3.01 --tls-verify=false
```

## quill 多媒體online編輯器
```
```