export const darkThemeConfig = {
    backColor: '#303133',
    borderColor: '#606266'
} 

export const lightThemeConfig = {
    backColor: '#F5F7FA',
    borderColor: '#DCDFE6',
} 

export const themeDarkOverrides = {
    "Layout": {
        "color": darkThemeConfig.backColor,
        "headerColor": darkThemeConfig.backColor,
        "siderColor": darkThemeConfig.backColor,
        "footerColor": darkThemeConfig.backColor,
        "headerBorderColor": darkThemeConfig.borderColor,
        "siderBorderColor": darkThemeConfig.borderColor,
        "footerBorderColor": darkThemeConfig.borderColor,
    },
    "Message": {
        "colorSuccess": "#ffffff",
        "textColorSuccess": "rgba(13, 237, 21, 1)",
        "colorInfo": "#ffffff",
        "textColorInfo": "rgba(13, 237, 21, 1)",
        "colorError": "#ffffff",
        "textColorError": "rgba(13, 237, 21, 1)",
        "colorWarning": "#ffffff",
        "textColorWarning": "rgba(13, 237, 21, 1)"
    },
    "Card": {
        "color": darkThemeConfig.backColor,
        "borderColor": darkThemeConfig.borderColor,
    },
    "DataTable": {
        "tdColor": darkThemeConfig.backColor
    }
}

export const themeLightOverrides = {
    "Layout": {
        "color": lightThemeConfig.backColor,
        "headerColor": lightThemeConfig.backColor,
        "siderColor": lightThemeConfig.backColor,
        "footerColor": lightThemeConfig.backColor,
        "headerBorderColor": lightThemeConfig.borderColor,
        "siderBorderColor": lightThemeConfig.borderColor,
        "footerBorderColor": lightThemeConfig.borderColor,
    },
    "Message": {
        "colorSuccess": "#000000",
        "textColorSuccess": "rgba(13, 237, 21, 1)",
        "colorInfo": "#000000",
        "textColorInfo": "rgba(13, 237, 21, 1)",
        "colorError": "#000000",
        "textColorError": "rgba(13, 237, 21, 1)",
        "colorWarning": "#000000",
        "textColorWarning": "rgba(13, 237, 21, 1)"
    },
    "Card": {
        "color": lightThemeConfig.backColor,
        "borderColor": lightThemeConfig.borderColor
    },
    "DataTable": {
        "tdColor": lightThemeConfig.backColor
    }
}
