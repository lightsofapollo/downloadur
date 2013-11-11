# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.hostname = "downloadur-berkshelf"

  config.vm.box = "Berkshelf-CentOS-6.3-x86_64-minimal"

  config.vm.box_url = "https://dl.dropbox.com/u/31081437/Berkshelf-CentOS-6.3-x86_64-minimal.box"
  config.vm.network :private_network, ip: "33.33.33.10"
  config.vm.network "forwarded_port", guest: 80, host: 60107

  # The path to the Berksfile to use with Vagrant Berkshelf
  config.berkshelf.berksfile_path = "./Berksfile"

  # Enabling the Berkshelf plugin. To enable this globally, add this configuration
  # option to your ~/.vagrant.d/Vagrantfile file
  config.berkshelf.enabled = true

  config.vm.provision :chef_solo do |chef|
    chef.json = {
      :downloadur => {
        :binaries => [
          { 
            source: 'http://ftp.mozilla.org/pub/mozilla.org/firefox/releases/latest/linux-x86_64/en-US/firefox-25.0.tar.bz2',
            target: 'firefox.tar.bz2'
          }
        ]
      }
    }

    chef.run_list = [
      "recipe[donwloadur]"
    ]
  end
end
