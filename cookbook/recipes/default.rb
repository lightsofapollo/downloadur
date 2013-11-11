include_recipe 'apache2'

DIRECTORY = '/home/vagrant/htdocs'

directory DIRECTORY do
  owner 'vagrant'
  group 'vagrant'
  action :create
  mode 00755
end

node[:downloadur][:binaries].each do |binary|
  bash "download #{binary[:target]}" do
    cwd DIRECTORY
    user 'vagrant'
    group 'vagrant'
    creates binary[:target]
    code "wget -O #{binary[:target]} #{binary[:source]}"
  end

  bash "hash #{binary[:target]}" do
    cwd DIRECTORY
    user 'vagrant'
    group 'vagrant'
    creates "#{binary[:target]}.sha1"
    code "sha1sum #{binary[:target]} > #{binary[:target]}.sha1"
  end
end

apache_site 'default' do
  enable false
end

web_app 'firefox' do
  server_name 'localhost'
  docroot DIRECTORY
  allow_override 'All'
end
