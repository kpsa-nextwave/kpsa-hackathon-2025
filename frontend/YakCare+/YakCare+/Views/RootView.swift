//
//  RootView.swift
//  YakCare+
//
//  Created by 이효주 on 7/26/25.
//

import SwiftUI

struct RootView: View {
    @State private var router = NavigationRouter()
    
    var body: some View {
        NavigationStack(path: $router.path) {
            LoginView()
                .environment(router)
                .navigationDestination(for: Route.self) { route in
                        switch route {
                        case .login:
                            LoginView()
                            // 하위 뷰에 environment로 router를 넘겨준다.
                                .environment(router)
                        case .signup:
                            SignupView().environment(router)
                        case .home:
                            HomeView().environment(router)
                        case .signup2:
                            SignupView2().environment(router)
                    }
                }
        }
    }
}

#Preview {
    RootView()
}
