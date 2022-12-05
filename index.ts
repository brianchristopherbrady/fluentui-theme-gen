import { tokens as aliases, createDarkTheme, webDarkTheme, webLightTheme, createLightTheme, Theme } from "@fluentui/react-components";
import { tridentBrandColorRamp } from "./tridentBrandColorRamp";
import { writeFileSync, mkdir } from 'fs';
import {resolve} from 'path';


// const darkTheme = createDarkTheme(tridentBrandColorRamp);
// const lightTheme = createLightTheme(tridentBrandColorRamp);

const objToCss = (obj: any) => {
    var keys = Object.keys(obj)
    var values = Object.values(obj);
    if (!keys.length) return ''
    var i, len = keys.length
    var result = ''
  
    for (i = 0; i < len; i++) {
      var key = keys[i]
      var val = obj[key]
      result += `\t--${key}: ${val};\n`;
    }
  
    return result
  }

  const formatObj = (obj: any) => {
    var keys = Object.keys(obj)
    var values = Object.values(obj);
    if (!keys.length) return ''
    var i, len = keys.length
    var result = ''
  
    for (i = 0; i < len; i++) {
      var key = keys[i]
      var val = obj[key]
      result += `\n\t${key}: "${val}",`;
    }
  
    return result
  }

  const formatJson = (obj: any) => {
    var keys = Object.keys(obj)
    var values = Object.values(obj);
    if (!keys.length) return ''
    var i, len = keys.length
    var result = ''
  
    for (i = 0; i < len; i++) {
      var key = keys[i]
      var val = obj[key]
      result += `\n\t"${key}": "${val}",`;
    }
  
    return result
  }

  // const darkThemeCss =  objToCss(darkTheme);
  // const lightThemeCss =  objToCss(lightTheme);
  // const aliasesCss =  objToCss(aliases);

  // const darkThemeTs = formatObj(darkTheme);
  // const lightThemeTs = formatObj(lightTheme);
  // const aliasesTs = formatObj(aliases);

  // const darkThemeJson = formatJson(darkTheme);
  // const lightThemeJson = formatJson(lightTheme);
  // const aliasesJson = formatJson(aliases);


  const writeFile = (outputPath: string, fileContent: string, fileType: string, theme: string) => {
    if(fileType == 'css') {
      writeFileSync(outputPath, `:root { \n ${fileContent} }`, 'utf8');
    } 
    else if (fileType === 'scss') {
      if ( theme === 'aliases' ) {
        writeFileSync(outputPath, `@mixin install-fluent-${theme} { \n ${fileContent} }`, 'utf8');
      } else {
        writeFileSync(outputPath, `@mixin install-fluent-${theme}-theme { \n ${fileContent} }`, 'utf8');
      }
    }
    else if (fileType === 'ts') {
      if ( theme === 'aliases' ) {
        writeFileSync(outputPath, `const fluent${theme.charAt(0).toUpperCase() + theme.slice(1)} = { ${fileContent} }`, 'utf8');
      }
      else {
        writeFileSync(outputPath, `const fluent${theme.charAt(0).toUpperCase() + theme.slice(1)}Theme = { ${fileContent} }`, 'utf8');
      }
    }
    else if (fileType === 'json') {
          writeFileSync(outputPath, `{ ${fileContent} }`, 'utf8');
      }
  }

  mkdir('./dist', { recursive: true }, (err) => {
    if (err) throw err;
  });

   
const createThemeFile = (output: string, fluentTheme: Theme, fileType: string, theme: string) => {
  if (fileType === 'css' || fileType === 'scss') {
    writeFile(resolve(__dirname, output), objToCss(fluentTheme), fileType, theme);
  }
  if (fileType === 'ts') {
    writeFile(resolve(__dirname, output), formatObj(fluentTheme), fileType, theme);
  }
  if (fileType === 'json') {
    writeFile(resolve(__dirname, output), formatJson(fluentTheme), fileType, theme);
  }
}

  const darkThemeCssFile = createThemeFile('./dist/trident-dark-theme.css', webDarkTheme, 'css', 'dark');
  const lightThemeCssFile = createThemeFile('./dist/trident-light-theme.css', webLightTheme, 'css', 'light');

  const darkThemeScssFile = createThemeFile('./dist/trident-dark-theme.scss', webDarkTheme, 'scss', 'dark');
  const lightThemeScssFile = createThemeFile('./dist/trident-light-theme.scss', webLightTheme, 'scss', 'light');

  const darkThemeTsFile = createThemeFile('./dist/trident-dark-theme.ts', webDarkTheme, 'ts', 'dark');
  const lightThemeTsFile = createThemeFile('./dist/trident-light-theme.ts', webLightTheme, 'ts', 'light');

  const darkThemeJsonFile = createThemeFile('./dist/trident-dark-theme.json', webDarkTheme, 'json', 'dark');
  const lightThemeJsonFile = createThemeFile('./dist/trident-light-theme.json', webLightTheme, 'json', 'light');


module.exports = {
  darkThemeCssFile,
  lightThemeCssFile,
  darkThemeScssFile,
  lightThemeScssFile,
  darkThemeTsFile,
  lightThemeTsFile,
  darkThemeJsonFile,
  lightThemeJsonFile,
}

