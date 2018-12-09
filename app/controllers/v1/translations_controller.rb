class V1::TranslationsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    if (translation = Translation.create(translation_params)).valid?
      return render json: { translation: translation }
    end
    render json: { errors: translation.errors }
  end

  private

  def translation_params
    params.require(:translation).permit(:key, :language, :value)
  end
end