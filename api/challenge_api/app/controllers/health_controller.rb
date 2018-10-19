class HealthController < ActionController::API

  def show 
    render json: {
      status: 200,
      message: "ok",
    }.to_json
  end
  
end