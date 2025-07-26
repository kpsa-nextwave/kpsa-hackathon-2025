//
//  ImageHandling.swift
//  YakCare+
//
//  Created by 이효주 on 7/26/25.
//

import UIKit

protocol ImageHandling: AnyObject {
    func addImage(_ image: UIImage)
    func getImages() -> [UIImage]
}
