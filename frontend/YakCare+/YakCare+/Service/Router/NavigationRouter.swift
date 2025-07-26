//
//  NavigationRouter.swift
//  YakCare+
//
//  Created by 이효주 on 7/26/25.
//

import SwiftUI
import Observation

@Observable
class NavigationRouter {
    var path = NavigationPath()
    
    ///  특정 화면을 추가 (Push 기능)
    func push(_ route: Route) {
        // 디버깅용 출력
        print(path)
        path.append(route)
    }
    
    /// 마지막 화면 제거 (Pop 기능)
    func pop() {
        if !path.isEmpty {
            path.removeLast()
        }
    }
    
    /// 네비게이션 초기화 (전체 Pop)
    func reset() {
        path = NavigationPath()
    }
}

