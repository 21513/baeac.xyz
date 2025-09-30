# Building a pipeline manager for individuals

##### Pipeline managers are used by studios to manage their assets, shots, and tasks. It is also very useful for individuals, but the software is often out of reach...

###### 30/09/2025

"project02_final_v2_reallyfinal_final2.blend"

This is how a lot of people keep track of their file versions. We all know this is not the best way but we have no idea how to change our ways. It's much easier to just quickly add a "v2" or "final" to the end of the filename instead of actually keeping track of what version it is. This is a nightmare when you have to go back to an older version of a file and you have no idea which one is which. It feels even worse when the client wants you to make an extra change to a file you thought was final.

There _is_ a way to fix this, but it requires a bit of discipline and a system to keep track of everything. This is where pipeline managers come in. They are used by studios to manage their assets, shots, and tasks. It is also very useful for individuals, but the software is often out of reach for individuals because of the price. I have been developing a pipeline manager for individuals and small studios that is affordable and easy to use.

### Control
The pipeline managers I have personally used prevent the user from making any destructive changes. You cannot delete any files or folders, you can't move files around, you can't rename files or folders. This is to prevent breaking the pipeline and any links to files or assets the programs use, but this is really annoying when you _know what you are doing_. It is a great way to prevent the less tech-savvy team-members from breaking the pipeline, but it is infuriating when you are the one who knows what you are doing and you just have to rename a folder you just made. In Beluga, you will be able to rename, move, and delete files and folders as you please. You are in control of your own pipeline. If you _are_ working in a team, you can set up user permissions to prevent certain users from making destructive changes, or disable it alltogether.

### Flexibility
I noticed with the other pipeline managers I used, that they were very rigid in their structure. You had to follow their structure and naming conventions, or you would break the pipeline. This is not ideal for individuals or small studios who have their own way of working. When a project was done with production and everyone went home, getting files from the file system without using the manager would be a pain. There would be hundreds of folders used only by the software and it is never intuitive to find anything. Beluga will make sure your folder structures are intuitive, also in the file explorer. It is designed to not be needed when a project is wrapped up. This way individuals in the team can go back to their favorite shots or assets for their portfolio easily.

### Affordability
Most pipeline managers are very expensive, especially for individuals or small studios. They often have a subscription model or just very high upfront costs. The free alternatives were lacking in their features or and were even less flexible than the paid options. Beluga will be affordable for individuals and small studios. It will have a one-time purchase price with optional yearly updates. There will also be a free version with limited features, but still very usable for individuals. It is made out of frustration, not out of greed.

### Performance

Beluga is built on Tauri, a framework for building desktop applications with web technologies. This means it will be cross-platform and run on Windows, Mac, and Linux. It will also be lightweight and fast, as Tauri uses the system's webview to render the UI. The backend will be built with Rust, a fast and safe systems programming language. This means it will be able to handle large projects and files without any issues. When copying files to Beluga, it will be just as quick as copying files in the file explorer, only restricted by your hardware speed.

I need your help to make this happen. I am looking for individuals and small studios who are interested in using Beluga and can provide feedback and feature requests. If you are interested, please contact me at contact@baeac.xyz. If you want to support the development of Beluga, you can also become a supporter on my [Patreon](https://www.patreon.com/baeac).