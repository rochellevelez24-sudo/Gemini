import plugin from '../plugin.json';

class MyPlugin {
  async init() {
    // Add a command to the command palette
    editorManager.editor.commands.addCommand({
      name: 'Generate code',
      description: 'Generate code from prompt',
      bindKey: { win: 'Ctrl-Alt-P', mac: 'Command-Alt-P' },
      exec: () => {
        window.alert('Hello from My Custom Plugin!');
      },
    });

    // Add a button to the header (optional)
    const $header = document.querySelector('header');
    if ($header) {
      const $btn = document.createElement('span');
      $btn.className = 'icon play_arrow'; // Using Acode's material icons
      $btn.onclick = () => window.alert('Header button clicked!');
      $header.appendChild($btn);
    }
  }

  async destroy() {
    // Cleanup logic when plugin is uninstalled or disabled
    editorManager.editor.commands.removeCommand('my-plugin-command');
  }
}

if (window.acode) {
  const acodePlugin = new MyPlugin();
  acode.setPluginInit(plugin.id, (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    acodePlugin.init(baseUrl, $page, cacheFileUrl, cacheFile);
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}
