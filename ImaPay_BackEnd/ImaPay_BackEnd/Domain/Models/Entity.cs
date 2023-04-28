using System.ComponentModel.DataAnnotations;

namespace ImaPay_BackEnd.Domain.Model;

public interface IEntity
{
    public int Id { get; set; }
}
public abstract class Entity:IEntity
{
    [Key]
    [Required]
    public int Id { get; set; }

}

