import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
// import styles from './AppCustomizer.module.scss';
import * as strings from 'AccessibilityApplicationCustomizerStrings';
import AccessibilityToolbar from './Components/AccessibilityToolbar';


const LOG_SOURCE: string = 'AccessibilityApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAccessibilityApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Css: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AccessibilityApplicationCustomizer
  extends BaseApplicationCustomizer<IAccessibilityApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    
    const Css: string = this.properties.Css;
    if (Css) {
      const Head: HTMLElement = document.getElementsByTagName("head")[0] || document.documentElement;
      const CustomStyle: HTMLLinkElement = document.createElement("link");
      CustomStyle.href = Css;
      CustomStyle.rel = "stylesheet";
      CustomStyle.type = "text/css";
      Head.insertBefore(CustomStyle, Head.firstChild);

    }
    return Promise.resolve();
  }
  private _renderPlaceHolders(): void {
    console.log("AccessiblityApplicationCustomizer._renderPlaceHolders()")
    console.log('Available placeholders: ',
      this
        .context.placeholderProvider
        .placeholderNames
        .map(name => PlaceholderName[name]).join(', '));
    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
    }

    // The extension should not assume that the expected placeholder is available.
    if (!this._topPlaceholder) {
      console.error("The expected placeholder (Top) was not found.");
      return;
    }
    if (this._topPlaceholder && this._topPlaceholder.domElement) {
      const element = React.createElement(AccessibilityToolbar);
      // eslint-disable-next-line @microsoft/spfx/pair-react-dom-render-unmount
      ReactDOM.render(element, this._topPlaceholder.domElement);
    }
  }
  private _onDispose(): void {
    console.log('[AccessiblityApplicationCustomizer._onDispose] Disposed custom top placeholders.');
  }
}