const defaultTheme = `
  .hyper-foobar .hyper-foobar-overlay {
    background-color: #FFF;
  }
  
  .hyper-foobar .hyper-foobar-icon {
    background-color: #FFF;
  }

  .hyper-foobar .hyper-foobar-icon-foobar {
    background-color: white;
  }

  .hyper-foobar .hyper-foobar-track {
    color: #FFF;
  }
`

const lightTheme = `
  .hyper-foobar .hyper-foobar-overlay {
    background-color: #FFF;
  }

  .hyper-foobar .hyper-foobar-icon {
    background-color: #FFF;
  }

  .hyper-foobar .hyper-foobar-track {
    color: #FFF;
  }
`

const darkTheme = `
  .hyper-foobar .hyper-foobar-overlay {
    background-color: #000;
  }

  .hyper-foobar .hyper-foobar-icon {
    background-color: #000;
  }

  .hyper-foobar .hyper-foobar-track {
    color: #000;
  }
`

// foobar:track:6wYJJ8AEhgS2euFsuTvZ1g
const halloweenTheme = `
  .hyper-foobar .hyper-foobar-overlay {
    background-color: #000;
  }

  .hyper-foobar .hyper-foobar-icon {
    background-color: #D75C1B;
  }

  .hyper-foobar .hyper-foobar-track {
    color: #D75C1B;
  }
`

export const getThemeCssByVariables = (overlayColor, iconColor, foobarIconColor, textColor) => {
  return `
    .hyper-foobar .hyper-foobar-overlay {
      background-color: ${overlayColor || '#FFF'};
    }
    
    .hyper-foobar .hyper-foobar-icon {
      background-color: ${iconColor || '#FFF'};
    }

    .hyper-foobar .hyper-foobar-icon-foobar {
      background-color: ${foobarIconColor || iconColor || 'white'};
    }

    .hyper-foobar .hyper-foobar-track {
      color: ${textColor || '#FFF'};
    }
  `
}

export const getThemeCssByName = (themeName, { overlayColor, iconColor, foobarIconColor, textColor } = {}) => {
  switch (themeName) {
    case 'light':
      return lightTheme;

    case 'dark':
      return darkTheme;

    case 'halloween':
      return halloweenTheme;

    case 'custom':
      return getThemeCssByVariables(overlayColor, iconColor, foobarIconColor, textColor);

    default:
      return defaultTheme;
  }
}

export default { getThemeCssByName, getThemeCssByVariables };
