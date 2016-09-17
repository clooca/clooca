API.md
=====

# clooca

## model

```
clooca.getModelInterface()
```

## editor

```
clooca.Editor.showAddInstanceModal()
```

```
clooca.Editor.addTab()
```


## user/storage

```
clooca.getUser()
clooca.getStorage()
```

# Plugin

```
clooca.registerPlugin('plugin name', function(cloocaObject, pluginObject) {
	//pluginObject
});
```


## client/server


```
plugin.on()
plugin.emit()
```

## plugin connection

```
plugin.on('highlight', function() {
	//highlight to something
});
```

```
clooca.plugin('diagram').emit('highlight')
```


# Low Level

## Lifecycle

```
clooca.on('load')
```


request to module

```
clooca.getModule('clooca').request()
```

receive event from module

```
clooca.getModule('modelexplorer').on('selected')
```
