/*
 * Copyright @ 2018-present Atlassian Pty Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#import <React/RCTBridge.h>
#import <React/RCTEventEmitter.h>

@interface Invite : RCTEventEmitter <RCTBridgeModule>

- (void)            invite:(NSArray<NSDictionary *> * _Nonnull)invitees
          externalAPIScope:(NSString * _Nonnull)externalAPIScope
  addPeopleControllerScope:(NSString * _Nonnull)addPeopleControllerScope;

- (void)      performQuery:(NSString * _Nonnull)query
          externalAPIScope:(NSString * _Nonnull)externalAPIScope
  addPeopleControllerScope:(NSString * _Nonnull)addPeopleControllerScope;

@end
