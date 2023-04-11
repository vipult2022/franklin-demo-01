/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Gets placeholders object
 * @param {string} prefix
 */
export async function fetchData(fileName = 'default', objParam) {
    const response = {}
    const param = '?' + new URLSearchParams(param).toString();
      const res = new Promise((resolve, reject) => {
        try {
          fetch(`${fileName}/.json${param}`)
            .then((resp) => resp.json())
            .then((json) => {
                response = {...json}
              resolve();
            });
        } catch (error) {
          // error loading placeholders
          console.error({error})
          reject();
        }
      });

    return response
  }