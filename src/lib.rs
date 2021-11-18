use napi_derive::napi;
use rand::RngCore;
use sha2::{Digest, Sha256};

#[napi]
fn fibonacci(n: u32) -> u32 {
    match n {
        1 | 2 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

#[napi]
fn hasher(s: String) -> String {
    let hash = Sha256::digest(s.as_bytes());

    format!("{:x}", hash)
}

#[napi]
fn hashes(n: u32) {
    let mut all_data = vec![];

    for _ in 0..n {
        let mut data = [0u8; 18];
        rand::thread_rng().fill_bytes(&mut data);
        all_data.push(data);
    }

    for data in all_data.iter() {
        let hash = Sha256::digest(data);

        let _hash = format!("{:x}", hash);
    }
}
