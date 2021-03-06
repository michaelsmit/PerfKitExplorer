/**
 * @copyright Copyright 2014 Google Inc. All rights reserved.
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
 *
 * @fileoverview Tests for WidgetConfigDirective, which encapsulates the UX for
 * configuring properties common to all widgets.
 * 
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.require('p3rf.perfkit.explorer.components.widget.WidgetConfigDirective');
goog.require('p3rf.perfkit.explorer.models.ChartWidgetModel');

describe('WidgetConfigDirective', function() {
  var scope, $compile, $httpBackend;

  const explorer = p3rf.perfkit.explorer;
  const ChartWidgetModel = explorer.models.ChartWidgetModel;

  const TEMPLATE_WIDGET_CONFIG = (
    '/static/components/widget/widget-config-directive.html');

  beforeEach(module('explorer'));
  beforeEach(module('p3rf.perfkit.explorer.templates'));

  beforeEach(inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
    scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
  }));

  describe('compilation', function() {

    it('should succeed as a standalone element.', function() {
      function compile() {
        $httpBackend.expectGET(TEMPLATE_WIDGET_CONFIG).respond(200);

        scope.providedWidgetModel = new ChartWidgetModel();
        
        var directiveElement = angular.element(
            '<widget-config ng-model="providedWidgetModel" />');

        $compile(directiveElement)(scope);
        scope.$digest();
      }
      expect(compile).not.toThrow();
    });
  });

  describe('should contain a element for', function() {

    var directiveElement;

    beforeEach(inject(function() {
      $httpBackend.expectGET(TEMPLATE_WIDGET_CONFIG).respond(200);
      scope.providedWidgetModel = new ChartWidgetModel();
      directiveElement = angular.element(
          '<widget-config ng-model="providedWidgetModel" />');

      $compile(directiveElement)(scope);
      scope.$digest();
    }));

    it('the widget title', function() {
      var targetElement = directiveElement.find(
          'input.widget-title');
      expect(targetElement.length).toBe(1);
    });

    it('the widget\'s url', function() {
      var targetElement = directiveElement.find(
          'input.widget-url');
      expect(targetElement.length).toBe(1);
    });

    it('the widget\'s column span', function() {
      var targetElement = directiveElement.find(
          'input.widget-layout-columnspan');
      expect(targetElement.length).toBe(1);
    });
  });

  describe('should reflect the ngModel state for', function() {
    beforeEach(inject(function() {
      $httpBackend.expectGET(TEMPLATE_WIDGET_CONFIG).respond(200);
      scope.providedWidgetModel = new ChartWidgetModel();
      directiveElement = angular.element(
          '<widget-config ng-model="providedWidgetModel" />');

      $compile(directiveElement)(scope);
      scope.$digest();
    }));

    it('the widget title', function() {
      var actualElement = directiveElement.find('input.widget-title')[0];

      expect(actualElement.value).toBe('');

      scope.providedWidgetModel.title = 'TEST_TITLE';
      scope.$digest();

      expect(actualElement.value).toBe('TEST_TITLE');
    });

    it('the widget\'s url', function() {
      var actualElement = directiveElement.find('input.widget-url')[0];

      expect(actualElement.value).toBe('');

      scope.providedWidgetModel.url = 'TEST_URL';
      scope.$digest();

      expect(actualElement.value).toBe('TEST_URL');
    });

    it('the widget\'s column span', function() {
      var actualElement = directiveElement.find(
          'input.widget-layout-columnspan')[0];

      expect(actualElement.value).toBe('1');

      scope.providedWidgetModel.layout.columnspan = 2;
      scope.$digest();

      expect(actualElement.value).toBe('2');
    });

  });
});
