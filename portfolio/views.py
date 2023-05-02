from bakery.views import BuildableTemplateView

class IndexView(BuildableTemplateView):
    template_name = 'index.html'