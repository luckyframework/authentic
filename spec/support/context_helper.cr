class ContextHelper
  private getter path, method

  def initialize(
    @path : String = "/",
    @method : String = "GET"
  )
  end

  def build : HTTP::Server::Context
    request = HTTP::Request.new(method, path)
    response = HTTP::Server::Response.new(IO::Memory.new)
    HTTP::Server::Context.new(request, response)
  end
end
