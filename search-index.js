crystal_doc_search_index_callback({"repository_name":"authentic","body":"# Authentic\n\n[![API Documentation Website](https://img.shields.io/website?down_color=red&down_message=Offline&label=API%20Documentation&up_message=Online&url=https%3A%2F%2Fluckyframework.github.io%2Fauthentic%2F)](https://luckyframework.github.io/authentic)\n\nA Crystal library for handling common authentication actions in Lucky projects.\n\n## Installation\n\nAuthentic is bundled in Lucky projects automatically.\n\n## Contributing\n\n1. Fork it ( https://github.com/luckyframework/authentic/fork )\n1. Create your feature branch (git checkout -b my-new-feature)\n1. Install docker and docker-compose: https://docs.docker.com/compose/install/\n1. Run `scripts/setup`\n1. Make your changes\n1. Run `scripts/test` to run the specs, build shards, and check formatting\n1. Commit your changes (git commit -am 'Add some feature')\n1. Push to the branch (git push origin my-new-feature)\n1. Create a new Pull Request\n\n## Testing\n\nTo run the tests:\n\n1. Install docker and docker-compose: https://docs.docker.com/compose/install/\n1. Run `scripts/setup` to set up the docker environment\n1. Run `scripts/test` to run the specs, build shards, and check formatting\n\nYou can run individual tests like this: `docker-compose run --rm app crystal spec path/to/spec.cr`\n\n> Remember to run `docker-compose down` when you're done. This will stop the\n> Crystal container.\n\n## Contributors\n\n- [paulcsmith](https://github.com/paulcsmith) Paul Smith - creator, maintainer\n","program":{"html_id":"authentic/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"locations":[],"repository_name":"authentic","program":true,"enum":false,"alias":false,"const":false,"types":[{"html_id":"authentic/Authentic","path":"Authentic.html","kind":"module","full_name":"Authentic","name":"Authentic","abstract":false,"ancestors":[{"html_id":"authentic/Habitat/SettingsHelpers","kind":"module","full_name":"Habitat::SettingsHelpers","name":"SettingsHelpers"},{"html_id":"authentic/Habitat/TempConfig","kind":"module","full_name":"Habitat::TempConfig","name":"TempConfig"}],"locations":[{"filename":"src/authentic.cr","line_number":33,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L33"},{"filename":"src/authentic/action_helpers.cr","line_number":2,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic/action_helpers.cr#L2"},{"filename":"src/authentic/version.cr","line_number":1,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic/version.cr#L1"}],"repository_name":"authentic","program":false,"enum":false,"alias":false,"const":false,"constants":[{"id":"HABITAT_SETTINGS","name":"HABITAT_SETTINGS","value":"[{decl: encryption_cost : Int32 = Crypto::Bcrypt::DEFAULT_COST, example: nil, validation: nil}, {decl: default_password_reset_time_limit : Time::Span = 15.minutes, example: nil, validation: nil}, {decl: secret_key : String, example: nil, validation: :validate_length}] of Nil"},{"id":"VERSION","name":"VERSION","value":"\"0.8.2\""}],"included_modules":[{"html_id":"authentic/Habitat/SettingsHelpers","kind":"module","full_name":"Habitat::SettingsHelpers","name":"SettingsHelpers"},{"html_id":"authentic/Habitat/TempConfig","kind":"module","full_name":"Habitat::TempConfig","name":"TempConfig"}],"doc":"Module for handling authentication\n\n## Configuration\n\nAuthentic uses [Habitat](https://github.com/luckyframework/habitat) for\nconfiguration.\n\nHere's how to set it up:\n\n```\n# Most of this is set up for you when you generate a new Lucky project.\n# This is usually in config/authentic.cr\nAuthentic.configure do |settings|\n  # Required: You must set a secret key for encrypting password reset tokens\n  # Hint: generate a key with: Random::Secure.base64(32)\n  settings.secret_key = \"32 character long secret\"\n\n  # Optional: `encryption_cost` defaults to `Crypto::Bcrypt::DEFAULT_COST`\n  # For faster tests set to 4 (the lowest allowed cost).\n  # Make sure to use `Crypto::Bcrypt::DEFAULT_COST` in production\n  settings.encryption_cost = 1\n\n  # Optional: `default_password_reset_time_limit` defaults to 15.minutes\n  settings.default_password_reset_time_limit = 1.day\nend\n```","summary":"<p>Module for handling authentication</p>","class_methods":[{"html_id":"configure(&)-class-method","name":"configure","abstract":false,"location":{"filename":"src/authentic.cr","line_number":34,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L34"},"def":{"name":"configure","yields":1,"visibility":"Public","body":"yield settings"}},{"html_id":"copy_and_encrypt(frompassword_field:Avram::Attribute|Avram::PermittedAttribute,toencrypted_password_field:Avram::Attribute|Avram::PermittedAttribute):Nil-class-method","name":"copy_and_encrypt","doc":"Encrypts a form password\n\n```\nclass SignUpUser < User::SaveOperation\n  attribute password : String\n\n  before_save encrypt_password\n\n  def encrypt_password\n    # Encrypt the `password` and copy the value to the `encrypted_password` field\n    Authentic.copy_and_encrypt password, to: encrypted_password\n  end\nend\n```","summary":"<p>Encrypts a form password</p>","abstract":false,"args":[{"name":"password_field","external_name":"from","restriction":"Avram::Attribute | Avram::PermittedAttribute"},{"name":"encrypted_password_field","external_name":"to","restriction":"Avram::Attribute | Avram::PermittedAttribute"}],"args_string":"(from password_field : Avram::Attribute | Avram::PermittedAttribute, to encrypted_password_field : Avram::Attribute | Avram::PermittedAttribute) : Nil","args_html":"(from password_field : Avram::Attribute | Avram::PermittedAttribute, to encrypted_password_field : Avram::Attribute | Avram::PermittedAttribute) : Nil","location":{"filename":"src/authentic.cr","line_number":117,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L117"},"def":{"name":"copy_and_encrypt","args":[{"name":"password_field","external_name":"from","restriction":"Avram::Attribute | Avram::PermittedAttribute"},{"name":"encrypted_password_field","external_name":"to","restriction":"Avram::Attribute | Avram::PermittedAttribute"}],"return_type":"Nil","visibility":"Public","body":"password_field.value.try do |value|\n  encrypted_password_field.value = generate_encrypted_password(value)\nend"}},{"html_id":"correct_password?(authenticatable:Authentic::PasswordAuthenticatable,password_value:String):Bool-class-method","name":"correct_password?","doc":"Checks whether the password is correct\n\n```\nuser = UserQuery.first\nAuthentic.correct_password?(user, \"my-password\")\n```","summary":"<p>Checks whether the password is correct</p>","abstract":false,"args":[{"name":"authenticatable","external_name":"authenticatable","restriction":"Authentic::PasswordAuthenticatable"},{"name":"password_value","external_name":"password_value","restriction":"String"}],"args_string":"(authenticatable : Authentic::PasswordAuthenticatable, password_value : String) : Bool","args_html":"(authenticatable : <a href=\"Authentic/PasswordAuthenticatable.html\">Authentic::PasswordAuthenticatable</a>, password_value : String) : Bool","location":{"filename":"src/authentic.cr","line_number":90,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L90"},"def":{"name":"correct_password?","args":[{"name":"authenticatable","external_name":"authenticatable","restriction":"Authentic::PasswordAuthenticatable"},{"name":"password_value","external_name":"password_value","restriction":"String"}],"return_type":"Bool","visibility":"Public","body":"encrypted_password = authenticatable.encrypted_password\nif encrypted_password\n  (Crypto::Bcrypt::Password.new(encrypted_password)).verify(password_value)\nelse\n  false\nend\n"}},{"html_id":"generate_encrypted_password(password_value:String,encryptor=Crypto::Bcrypt::Password):String-class-method","name":"generate_encrypted_password","doc":"Generates a encrypted password from a password string\n\nBy default it uses Bcrypt to encrypt the password.","summary":"<p>Generates a encrypted password from a password string</p>","abstract":false,"args":[{"name":"password_value","external_name":"password_value","restriction":"String"},{"name":"encryptor","default_value":"Crypto::Bcrypt::Password","external_name":"encryptor","restriction":""}],"args_string":"(password_value : String, encryptor = Crypto::Bcrypt::Password) : String","args_html":"(password_value : String, encryptor = <span class=\"t\">Crypto</span><span class=\"t\">::</span><span class=\"t\">Bcrypt</span><span class=\"t\">::</span><span class=\"t\">Password</span>) : String","location":{"filename":"src/authentic.cr","line_number":129,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L129"},"def":{"name":"generate_encrypted_password","args":[{"name":"password_value","external_name":"password_value","restriction":"String"},{"name":"encryptor","default_value":"Crypto::Bcrypt::Password","external_name":"encryptor","restriction":""}],"return_type":"String","visibility":"Public","body":"(encryptor.create(password_value, cost: settings.encryption_cost)).to_s"}},{"html_id":"generate_password_reset_token(authenticatable:Authentic::PasswordAuthenticatable,expires_in:Time::Span=Authentic.settings.default_password_reset_time_limit):String-class-method","name":"generate_password_reset_token","doc":"Generates a password reset token","summary":"<p>Generates a password reset token</p>","abstract":false,"args":[{"name":"authenticatable","external_name":"authenticatable","restriction":"Authentic::PasswordAuthenticatable"},{"name":"expires_in","default_value":"Authentic.settings.default_password_reset_time_limit","external_name":"expires_in","restriction":"Time::Span"}],"args_string":"(authenticatable : Authentic::PasswordAuthenticatable, expires_in : Time::Span = Authentic.settings.default_password_reset_time_limit) : String","args_html":"(authenticatable : <a href=\"Authentic/PasswordAuthenticatable.html\">Authentic::PasswordAuthenticatable</a>, expires_in : Time::Span = <span class=\"t\">Authentic</span>.settings.default_password_reset_time_limit) : String","location":{"filename":"src/authentic.cr","line_number":140,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L140"},"def":{"name":"generate_password_reset_token","args":[{"name":"authenticatable","external_name":"authenticatable","restriction":"Authentic::PasswordAuthenticatable"},{"name":"expires_in","default_value":"Authentic.settings.default_password_reset_time_limit","external_name":"expires_in","restriction":"Time::Span"}],"return_type":"String","visibility":"Public","body":"encryptor = Lucky::MessageEncryptor.new(secret: settings.secret_key)\nencryptor.encrypt_and_sign(\"#{authenticatable.id}:#{expires_in.from_now.to_unix_ms}\")\n"}},{"html_id":"redirect_to_originally_requested_path(action:Lucky::Action,fallback:Lucky::Action.class|Lucky::RouteHelper):Lucky::Response-class-method","name":"redirect_to_originally_requested_path","doc":"After successful sign in, call this to redirect back to the originally request path\n\nFirst call `Authentic.remember_requested_path` if the user is not signed in.\nThen call this to redirect them. A `fallback` action is required. The\n`fallback` action will be used if user was not trying to access a protected\npage before sign in.","summary":"<p>After successful sign in, call this to redirect back to the originally request path</p>","abstract":false,"args":[{"name":"action","external_name":"action","restriction":"Lucky::Action"},{"name":"fallback","external_name":"fallback","restriction":"Lucky::Action.class | Lucky::RouteHelper"}],"args_string":"(action : Lucky::Action, fallback : Lucky::Action.class | Lucky::RouteHelper) : Lucky::Response","args_html":"(action : Lucky::Action, fallback : <span class=\"t\">Lucky</span><span class=\"t\">::</span><span class=\"t\">Action</span>.<span class=\"k\">class</span> | Lucky::RouteHelper) : Lucky::Response","location":{"filename":"src/authentic.cr","line_number":75,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L75"},"def":{"name":"redirect_to_originally_requested_path","args":[{"name":"action","external_name":"action","restriction":"Lucky::Action"},{"name":"fallback","external_name":"fallback","restriction":"Lucky::Action.class | Lucky::RouteHelper"}],"return_type":"Lucky::Response","visibility":"Public","body":"return_to = action.session.get?(:return_to)\naction.session.delete(:return_to)\naction.redirect(to: return_to || fallback)\n"}},{"html_id":"remember_requested_path(action:Lucky::Action):Nil-class-method","name":"remember_requested_path","doc":"Remember the originally requested path if it is a GET\n\nCall this if the user requested an action that requires sign in.\nIt will remember the path they requested if it is a get.\n\nOnce the user signs in call `Authentic.redirect_to_originally_requested_path`\nto redirect them back.","summary":"<p>Remember the originally requested path if it is a GET</p>","abstract":false,"args":[{"name":"action","external_name":"action","restriction":"Lucky::Action"}],"args_string":"(action : Lucky::Action) : Nil","args_html":"(action : Lucky::Action) : Nil","location":{"filename":"src/authentic.cr","line_number":63,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L63"},"def":{"name":"remember_requested_path","args":[{"name":"action","external_name":"action","restriction":"Lucky::Action"}],"return_type":"Nil","visibility":"Public","body":"if action.request.method.upcase == \"GET\"\n  action.session.set(:return_to, action.request.resource)\nend"}},{"html_id":"settings-class-method","name":"settings","abstract":false,"location":{"filename":"src/authentic.cr","line_number":34,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L34"},"def":{"name":"settings","visibility":"Public","body":"HabitatSettings"}},{"html_id":"valid_password_reset_token?(authenticatable:Authentic::PasswordAuthenticatable,token:String):Bool-class-method","name":"valid_password_reset_token?","doc":"Checks that the given reset token is valid\n\nA token is valid if the id matches the authenticatable and the token is not\nexpired.\n\nTo generate a token see `Authentic.generate_password_reset_token`","summary":"<p>Checks that the given reset token is valid</p>","abstract":false,"args":[{"name":"authenticatable","external_name":"authenticatable","restriction":"Authentic::PasswordAuthenticatable"},{"name":"token","external_name":"token","restriction":"String"}],"args_string":"(authenticatable : Authentic::PasswordAuthenticatable, token : String) : Bool","args_html":"(authenticatable : <a href=\"Authentic/PasswordAuthenticatable.html\">Authentic::PasswordAuthenticatable</a>, token : String) : Bool","location":{"filename":"src/authentic.cr","line_number":154,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L154"},"def":{"name":"valid_password_reset_token?","args":[{"name":"authenticatable","external_name":"authenticatable","restriction":"Authentic::PasswordAuthenticatable"},{"name":"token","external_name":"token","restriction":"String"}],"return_type":"Bool","visibility":"Public","body":"encryptor = Lucky::MessageEncryptor.new(secret: settings.secret_key)\nuser_id, expiration_in_ms = (String.new(encryptor.verify_and_decrypt(token))).split(\":\")\nTime.utc.to_unix_ms <= expiration_in_ms.to_i64 && (user_id.to_s == authenticatable.id.to_s)\n"}},{"html_id":"validate_length(value:String)-class-method","name":"validate_length","abstract":false,"args":[{"name":"value","external_name":"value","restriction":"String"}],"args_string":"(value : String)","args_html":"(value : String)","location":{"filename":"src/authentic.cr","line_number":40,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L40"},"def":{"name":"validate_length","args":[{"name":"value","external_name":"value","restriction":"String"}],"visibility":"Public","body":"if value.bytesize < 32\n  Habitat.raise_validation_error(\"\\nAuthentic secret_key setting must be at least 32 bytes long,\\nbut got #{value.bytesize} bytes '#{value}'.\\n\\nTry this...\\n\\n  ▸ Generate a new key with `lucky gen.secret_key`\\n  ▸ Set the secret_key value in your Authentic.configure block\\n\")\nend"}}],"instance_methods":[{"html_id":"settings-instance-method","name":"settings","abstract":false,"location":{"filename":"src/authentic.cr","line_number":34,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L34"},"def":{"name":"settings","visibility":"Public","body":"HabitatSettings"}}],"types":[{"html_id":"authentic/Authentic/ActionHelpers","path":"Authentic/ActionHelpers.html","kind":"module","full_name":"Authentic::ActionHelpers(T)","name":"ActionHelpers","abstract":false,"locations":[{"filename":"src/authentic/action_helpers.cr","line_number":2,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic/action_helpers.cr#L2"}],"repository_name":"authentic","program":false,"enum":false,"alias":false,"const":false,"constants":[{"id":"SIGN_IN_KEY","name":"SIGN_IN_KEY","value":"\"user_id\""}],"namespace":{"html_id":"authentic/Authentic","kind":"module","full_name":"Authentic","name":"Authentic"},"doc":"Helpers methods for Lucky actions","summary":"<p>Helpers methods for Lucky actions</p>","instance_methods":[{"html_id":"current_user:T?-instance-method","name":"current_user","doc":"Returns the signed in user if signed in, otherwise returns `nil`\n\nThis method is often overridden by different modules/pipes. For example,\nWhen sign in is required this method is typically overridden by calling\n`not_nil!` since the user will always be returned.\n\nFor an example, see the `Auth::RequireSignIn` module in a newly generated\nLucky project.","summary":"<p>Returns the signed in user if signed in, otherwise returns <code>nil</code></p>","abstract":false,"location":{"filename":"src/authentic/action_helpers.cr","line_number":23,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic/action_helpers.cr#L23"},"def":{"name":"current_user","return_type":"T | ::Nil","visibility":"Public","body":"current_user?"}},{"html_id":"current_user?:T?-instance-method","name":"current_user?","doc":"Return the signed in user if signed in, otherwise returns `nil`\n\nThis method should *not* be overridden. If you want to require a current user,\noverride the `current_user` method (note no `?`).","summary":"<p>Return the signed in user if signed in, otherwise returns <code>nil</code></p>","abstract":false,"location":{"filename":"src/authentic/action_helpers.cr","line_number":34,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic/action_helpers.cr#L34"},"def":{"name":"current_user?","return_type":"T | ::Nil","visibility":"Public","body":"@__current_user || (@__current_user = (begin\n  id = session.get?(SIGN_IN_KEY)\n  if id\n    find_current_user(id)\n  end\nend))"}},{"html_id":"find_current_user(id):T?-instance-method","name":"find_current_user","abstract":true,"args":[{"name":"id","external_name":"id","restriction":""}],"args_string":"(id) : T?","args_html":"(id) : T?","location":{"filename":"src/authentic/action_helpers.cr","line_number":43,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic/action_helpers.cr#L43"},"def":{"name":"find_current_user","args":[{"name":"id","external_name":"id","restriction":""}],"return_type":"T | ::Nil","visibility":"Public","body":""}},{"html_id":"sign_in(authenticatable:T):Nil-instance-method","name":"sign_in","doc":"Signs a user in using the browser session.","summary":"<p>Signs a user in using the browser session.</p>","abstract":false,"args":[{"name":"authenticatable","external_name":"authenticatable","restriction":"T"}],"args_string":"(authenticatable : T) : Nil","args_html":"(authenticatable : T) : Nil","location":{"filename":"src/authentic/action_helpers.cr","line_number":6,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic/action_helpers.cr#L6"},"def":{"name":"sign_in","args":[{"name":"authenticatable","external_name":"authenticatable","restriction":"T"}],"return_type":"Nil","visibility":"Public","body":"session.set(SIGN_IN_KEY, authenticatable.id.to_s)"}},{"html_id":"sign_out:Nil-instance-method","name":"sign_out","doc":"Sign the user out by clearing the session.","summary":"<p>Sign the user out by clearing the session.</p>","abstract":false,"location":{"filename":"src/authentic/action_helpers.cr","line_number":11,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic/action_helpers.cr#L11"},"def":{"name":"sign_out","return_type":"Nil","visibility":"Public","body":"session.clear"}}]},{"html_id":"authentic/Authentic/HabitatSettings","path":"Authentic/HabitatSettings.html","kind":"class","full_name":"Authentic::HabitatSettings","name":"HabitatSettings","abstract":false,"superclass":{"html_id":"authentic/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"authentic/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"authentic/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/authentic.cr","line_number":34,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic.cr#L34"}],"repository_name":"authentic","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"authentic/Authentic","kind":"module","full_name":"Authentic","name":"Authentic"},"class_methods":[{"html_id":"default_password_reset_time_limit:Time::Span-class-method","name":"default_password_reset_time_limit","abstract":false,"def":{"name":"default_password_reset_time_limit","return_type":"Time::Span","visibility":"Public","body":"@@default_password_reset_time_limit.not_nil!"}},{"html_id":"default_password_reset_time_limit=(value:Time::Span)-class-method","name":"default_password_reset_time_limit=","abstract":false,"args":[{"name":"value","external_name":"value","restriction":"Time::Span"}],"args_string":"(value : Time::Span)","args_html":"(value : Time::Span)","def":{"name":"default_password_reset_time_limit=","args":[{"name":"value","external_name":"value","restriction":"Time::Span"}],"visibility":"Public","body":"@@default_password_reset_time_limit = value"}},{"html_id":"default_password_reset_time_limit?-class-method","name":"default_password_reset_time_limit?","doc":"Used for checking missing settings on non-nilable types\nIt's advised to use default_password_reset_time_limit in your apps to ensure\nthe propper type is checked.","summary":"<p>Used for checking missing settings on non-nilable types It's advised to use default_password_reset_time_limit in your apps to ensure the propper type is checked.</p>","abstract":false,"def":{"name":"default_password_reset_time_limit?","visibility":"Public","body":"@@default_password_reset_time_limit"}},{"html_id":"encryption_cost:Int32-class-method","name":"encryption_cost","abstract":false,"def":{"name":"encryption_cost","return_type":"Int32","visibility":"Public","body":"@@encryption_cost.not_nil!"}},{"html_id":"encryption_cost=(value:Int32)-class-method","name":"encryption_cost=","abstract":false,"args":[{"name":"value","external_name":"value","restriction":"Int32"}],"args_string":"(value : Int32)","args_html":"(value : Int32)","def":{"name":"encryption_cost=","args":[{"name":"value","external_name":"value","restriction":"Int32"}],"visibility":"Public","body":"@@encryption_cost = value"}},{"html_id":"encryption_cost?-class-method","name":"encryption_cost?","doc":"Used for checking missing settings on non-nilable types\nIt's advised to use encryption_cost in your apps to ensure\nthe propper type is checked.","summary":"<p>Used for checking missing settings on non-nilable types It's advised to use encryption_cost in your apps to ensure the propper type is checked.</p>","abstract":false,"def":{"name":"encryption_cost?","visibility":"Public","body":"@@encryption_cost"}},{"html_id":"secret_key:String-class-method","name":"secret_key","abstract":false,"def":{"name":"secret_key","return_type":"String","visibility":"Public","body":"@@secret_key.not_nil!"}},{"html_id":"secret_key=(value:String)-class-method","name":"secret_key=","abstract":false,"args":[{"name":"value","external_name":"value","restriction":"String"}],"args_string":"(value : String)","args_html":"(value : String)","def":{"name":"secret_key=","args":[{"name":"value","external_name":"value","restriction":"String"}],"visibility":"Public","body":"Authentic.validate_length(value)\n@@secret_key = value\n"}},{"html_id":"secret_key?-class-method","name":"secret_key?","doc":"Used for checking missing settings on non-nilable types\nIt's advised to use secret_key in your apps to ensure\nthe propper type is checked.","summary":"<p>Used for checking missing settings on non-nilable types It's advised to use secret_key in your apps to ensure the propper type is checked.</p>","abstract":false,"def":{"name":"secret_key?","visibility":"Public","body":"@@secret_key"}},{"html_id":"to_h-class-method","name":"to_h","doc":"Generates a hash using the provided values","summary":"<p>Generates a hash using the provided values</p>","abstract":false,"def":{"name":"to_h","visibility":"Public","body":"{\"encryption_cost\" => encryption_cost, \"default_password_reset_time_limit\" => default_password_reset_time_limit, \"secret_key\" => secret_key}"}}]},{"html_id":"authentic/Authentic/PasswordAuthenticatable","path":"Authentic/PasswordAuthenticatable.html","kind":"module","full_name":"Authentic::PasswordAuthenticatable","name":"PasswordAuthenticatable","abstract":false,"locations":[{"filename":"src/authentic/password_authenticatable.cr","line_number":1,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic/password_authenticatable.cr#L1"}],"repository_name":"authentic","program":false,"enum":false,"alias":false,"const":false,"namespace":{"html_id":"authentic/Authentic","kind":"module","full_name":"Authentic","name":"Authentic"},"instance_methods":[{"html_id":"encrypted_password:String?-instance-method","name":"encrypted_password","abstract":true,"location":{"filename":"src/authentic/password_authenticatable.cr","line_number":3,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic/password_authenticatable.cr#L3"},"def":{"name":"encrypted_password","return_type":"String | ::Nil","visibility":"Public","body":""}},{"html_id":"id-instance-method","name":"id","abstract":true,"location":{"filename":"src/authentic/password_authenticatable.cr","line_number":2,"url":"https://github.com/luckyframework/authentic/blob/95c6fc773635358a752a2af2551b5fdd020b207a/src/authentic/password_authenticatable.cr#L2"},"def":{"name":"id","visibility":"Public","body":""}}]}]}]}})