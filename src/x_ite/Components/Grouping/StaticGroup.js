/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/Grouping/X3DBoundedObject",
	"x_ite/Components/Grouping/Group",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Box3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode, 
          X3DBoundedObject, 
          Group,
          X3DConstants,
          Box3)
{
"use strict";

	function StaticGroup (executionContext)
	{
		X3DChildNode     .call (this, executionContext);
		X3DBoundedObject .call (this, executionContext);

		this .addType (X3DConstants .StaticGroup);

		this .group = new Group (this .getExecutionContext ());
		this .bbox  = new Box3 ();
	}

	StaticGroup .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
	{
		constructor: StaticGroup,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",   new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter", new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "children",   new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "StaticGroup";
		},
		getComponentName: function ()
		{
			return "Grouping";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DChildNode     .prototype .initialize .call (this);
			X3DBoundedObject .prototype .initialize .call (this);

			this .bboxSize_   .addFieldInterest (this .group .bboxSize_);
			this .bboxCenter_ .addFieldInterest (this .group .bboxCenter_);
			this .children_   .addFieldInterest (this .group .children_);

			this .group .bboxSize_   = this .bboxSize_;
			this .group .bboxCenter_ = this .bboxCenter_;
			this .group .children_   = this .children_;
			this .group .setPrivate (true);
			this .group .setup ();

			// Connect after Group setup.
			this .group .isCameraObject_ .addFieldInterest (this .isCameraObject_);
			this .group .children_       .addInterest ("set_children__", this);

			this .set_children__ ();
		},
		getBBox: function (bbox)
		{
			return bbox .assign (this .bbox);
		},
		set_children__: function ()
		{
			this .group .getBBox (this .bbox);
		},
		traverse: function (type, renderObject)
		{
			this .group .traverse (type, renderObject);
		},
	});

	return StaticGroup;
});


