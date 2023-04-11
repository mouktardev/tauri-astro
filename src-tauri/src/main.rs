#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, Submenu};

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));

    let light = CustomMenuItem::new("Light", "Light").accelerator("CmdOrCtrl+L");
    let dark = CustomMenuItem::new("Dark", "Dark").accelerator("CmdOrCtrl+D");
    let theme = Submenu::new("Theme", Menu::new().add_item(light).add_item(dark));

    let menu = Menu::new().add_submenu(submenu).add_submenu(theme);
    // .add_native_item(MenuItem::Copy)
    // .add_item(CustomMenuItem::new("hide", "Hide"))

    tauri::Builder::default()
        // .on_window_event(|event| {
        // if let WindowEvent::FileDrop(file) = event.event() {
        //     println!("{:?}", file);
        // }})
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            "close" => {
                event.window().close().unwrap();
            }
            "dark" => {}
            "light" => {}
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
