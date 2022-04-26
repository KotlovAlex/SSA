import eel

eel.init('pages')

@ell.expose
def a(x):
    print(x)

eel.start('index.html')