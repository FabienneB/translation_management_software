Rails.application.routes.draw do
  get 'home/index'
  root 'home#index'

  namespace :v1 do
    post '/translations', to: 'translations#create'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
