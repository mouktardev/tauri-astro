#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::api::dialog::FileDialogBuilder;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
    let open = CustomMenuItem::new("open", "Open").accelerator("CmdOrCtrl+o");
    let close = CustomMenuItem::new("close", "Close").accelerator("CmdOrCtrl+w");
    let on_top = CustomMenuItem::new("always_on_top", "Window On top").accelerator("CmdOrCtrl+t");
    let normal = CustomMenuItem::new("normal", "Window Normal ").accelerator("CmdOrCtrl+n");

    let file = Submenu::new("File", Menu::new().add_item(open).add_item(close));
    let edit = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Paste),
    );
    let view = Submenu::new("View", Menu::new().add_item(on_top).add_item(normal));

    let menu = Menu::new()
        .add_submenu(file)
        .add_submenu(edit)
        .add_submenu(view);
    // .add_item(CustomMenuItem::new("hide", "Hide"));

    tauri::Builder::default()
        // .on_window_event(|event| {
        // if let WindowEvent::FileDrop(file) = event.event() {
        //     println!("{:?}", file);
        // }})
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "open" => {
                FileDialogBuilder::new()
                    // .add_filter("Text Files", &["txt"])
                    // .add_filter("Markdown Files", &["md"])
                    .pick_files(|file_paths| {
                        // do something with the optional folder paths here
                        // the folder paths value is `None` if the user closed the dialog
                    });
            }
            "close" => {
                event.window().close().unwrap();
            }
            "always_on_top" => {
                event.window().set_always_on_top(true).unwrap();
            }
            "normal" => {
                event.window().set_always_on_top(false).unwrap();
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
