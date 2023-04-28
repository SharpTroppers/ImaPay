using ImaPay_BackEnd.Domain.Model;

namespace ImaPay_BackEnd.Repositories.Interfaces;

/// <summary>
///  Iterface generica para implementação de operalções Crud no repositorio base
/// </summary>
public interface IRepository<T> where T : Entity
{
    /// <summary>
    ///  Pega todas as entidades de um tipo a ser especificado
    /// </summary>
    Task<IEnumerable<T>> GetAll();

    /// <summary>
    ///  Pega uma entidade ede acordo com seu id
    /// </summary>
    Task<T> GetById(int id);

    Task Add(T entity);

    Task Update(T entity);

    Task Delete(int id);

    Task<int> GetNumberOfEntities();
}

