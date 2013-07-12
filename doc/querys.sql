-- Escuelas
-- --Total de escuelas
	SELECT COUNT(C.IdCentro) [Cantidad] FROM Centros C
	
	SELECT COUNT(C.IdCentro) [Cantidad], TDM.Nombre [Territorio] FROM Centros C 
	INNER JOIN DistritosMunicipales TDM ON TDM.IdDistritoMunicipal = C.IdDistritoMunicipal
	GROUP BY TDM.Nombre 

	SELECT COUNT(C.IdCentro) [Cantidad], TM.Nombre [Territorio] FROM Centros C 
	INNER JOIN DistritosMunicipales TDM ON TDM.IdDistritoMunicipal = C.IdDistritoMunicipal 
	INNER JOIN Municipios TM ON TM.IdMunicipio = TDM.IdMunicipio 
	GROUP BY TM.Nombre 

	SELECT COUNT(C.IdCentro) [Cantidad], TP.Nombre [Territorio] FROM Centros C 
	INNER JOIN DistritosMunicipales TDM ON TDM.IdDistritoMunicipal = C.IdDistritoMunicipal 
	INNER JOIN Municipios TM ON TM.IdMunicipio = TDM.IdMunicipio 
	INNER JOIN Provincias TP ON TP.IdProvincia = TM.IdProvincia  
	GROUP BY TP.Nombre 
	-- Total de las esculeas dividios por tipo

	-- Totales de escuelas unificadas


-- Estudiantes 
	-- Cuantos estudiantes (texto)
	SELECT COUNT(E.IdPersona) FROM Personas E WHERE E.IdPersona IN (SELECT M.IdEstudiante as IdPersona FROM Matriculas M)
	-- Estudiantes divididos por sexo (pastel)
	-- Promedio de edad de estudiantes (texto)
	SELECT AVG( DATEDIFF(YEAR,E.FechaNacimiento, GETDATE()) ) FROM Personas E WHERE E.IdPersona IN (SELECT M.IdEstudiante as IdPersona FROM Matriculas M)
	-- Promedio de calificacion de estudiantes 
	-- Promedio de calificacion de estudiantes divididos sexo
	-- Promedio de calificacion divididos por edad 



-- Pruebas Nacionales
	-- Promedio de calificacion de estudiantes
	SELECT AVG(CPN.Calificacion) [Promedio Calificacion] FROM CalificacionesPruebasNacionales CPN WHERE Calificacion != 0
	
	-- Promedio de calificacion de estudiantes dividido por sexo
	SELECT AVG(CPN.Calificacion) [Promedio Calificacion], S.Nombre [Sexo] FROM CalificacionesPruebasNacionales CPN 
	INNER JOIN Matriculas M ON M.IdMatricula = CPN.IdMatricula 
	INNER JOIN Personas E ON E.IdPersona = M.IdEstudiante 
	INNER JOIN Sexos S ON S.IdSexo = E.IdSexo 
	WHERE CPN.Calificacion != 0 
	GROUP BY S.Nombre

	-- Promedio de calificacion de estudiantes dividido por edad
	SELECT AVG(CPN.Calificacion) [Promedio Calificacion], DATEDIFF(YEAR,E.FechaNacimiento, CPN.Version) [Edad] FROM CalificacionesPruebasNacionales CPN 
	INNER JOIN Matriculas M ON M.IdMatricula = CPN.IdMatricula 
	INNER JOIN Personas E ON E.IdPersona = M.IdEstudiante 
	WHERE CPN.Calificacion != 0 
	AND E.FechaNacimiento != 0 
	GROUP BY DATEDIFF(YEAR,E.FechaNacimiento, CPN.Version)

	-- Promedio de  calificacion divididos por materia 
		-- ???
	SELECT AVG(CPN.Calificacion) [Promedio Calificacion], A.Nombre [Asignatura] FROM CalificacionesPruebasNacionales CPN 
	INNER JOIN Asignaturas A ON A.IdAsignatura = CPN.IdAsignatura  
	WHERE CPN.Calificacion != 0 
	GROUP BY A.Nombre

	-- Promedio de  calificacion divididos por materia por estudiantes divididos por sexo
	SELECT AVG(CPN.Calificacion) [Promedio Calificacion], A.Nombre [Asignatura], S.Nombre [Sexo] FROM CalificacionesPruebasNacionales CPN 
	INNER JOIN Asignaturas A ON A.IdAsignatura = CPN.IdAsignatura  
	INNER JOIN Matriculas M ON M.IdMatricula = CPN.IdMatricula 
	INNER JOIN Personas E ON E.IdPersona = M.IdEstudiante 
	INNER JOIN Sexos S ON S.IdSexo = E.IdSexo 
	WHERE CPN.Calificacion != 0 
	GROUP BY A.Nombre ,S.Nombre

	-- Promedio de  calificacion divididos por materia por estudiantes divididos por edad
	SELECT AVG(CPN.Calificacion) [Promedio Calificacion], A.Nombre [Asignatura], DATEDIFF(YEAR,E.FechaNacimiento, CPN.Version) [Edad] FROM CalificacionesPruebasNacionales CPN 
	INNER JOIN Asignaturas A ON A.IdAsignatura = CPN.IdAsignatura  
	INNER JOIN Matriculas M ON M.IdMatricula = CPN.IdMatricula 
	INNER JOIN Personas E ON E.IdPersona = M.IdEstudiante 
	INNER JOIN Sexos S ON S.IdSexo = E.IdSexo 
	WHERE CPN.Calificacion != 0 
	AND E.FechaNacimiento != 0 
	GROUP BY A.Nombre ,DATEDIFF(YEAR,E.FechaNacimiento, CPN.Version)


-- Estudiantes 
	-- 	Cuantos estudiantes
	SELECT COUNT(E.IdPersona) [Cantidad] FROM Personas E WHERE E.IdPersona IN (SELECT M.IdEstudiante as IdPersona FROM Matriculas M)
	
	-- 	Estudiantes divididos por sexo
	SELECT COUNT(E.IdPersona) [Cantidad], S.Nombre [Sexo] FROM Personas E 
	INNER JOIN Sexos S ON S.IdSexo = E.IdSexo 
	WHERE E.IdPersona IN (SELECT M.IdEstudiante as IdPersona FROM Matriculas M) 
	GROUP BY S.Nombre

	-- 	Promedio de edad de estudiantes
	SELECT COUNT(E.IdPersona) [Cantidad], DATEDIFF(YEAR,E.FechaNacimiento, GETDATE()) [Edad] FROM Personas E 
	INNER JOIN Sexos S ON S.IdSexo = E.IdSexo 
	WHERE E.IdPersona IN (SELECT M.IdEstudiante as IdPersona FROM Matriculas M) 
	AND E.FechaNacimiento != 0 
	GROUP BY DATEDIFF(YEAR,E.FechaNacimiento, GETDATE())

	-- 	Promedio de calificacion de estudiantes
	SELECT AVG(C.Promedio) [Promedio Calificacion] FROM Calificaciones C 
	WHERE C.Promedio != 0 

	-- 	Promedio de calificacion de estudiantes divididos sexo
	SELECT AVG(C.Promedio) [Promedio Calificacion], S.Nombre [Sexo] FROM Calificaciones C 
	INNER JOIN Matriculas M ON M.IdMatricula = C.IdMatricula 
	INNER JOIN Personas E ON E.IdPersona = M.IdEstudiante
	INNER JOIN Sexos S ON S.IdSexo = E.IdSexo 
	WHERE C.Promedio != 0 
	GROUP BY S.Nombre 

	-- 	Promedio de calificacion divididos por edad
	SELECT AVG(C.Promedio) [Promedio Calificacion], DATEDIFF(YEAR,E.FechaNacimiento, C.Version) [Edad] FROM Calificaciones C 
	INNER JOIN Matriculas M ON M.IdMatricula = C.IdMatricula 
	INNER JOIN Personas E ON E.IdPersona = M.IdEstudiante
	INNER JOIN Sexos S ON S.IdSexo = E.IdSexo 
	WHERE C.Promedio != 0 
	AND E.FechaNacimiento != 0 
	GROUP BY DATEDIFF(YEAR,E.FechaNacimiento, C.Version)

